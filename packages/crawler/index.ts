import express, { Express, Request, Response } from 'express';
import axios from 'axios';
import { load } from 'cheerio';

// -----------------------------------------------
const app: Express = express();
const port = process.env.PORT || 5999;
const EDU_URL = 'https://edusoftweb.hcmiu.edu.vn';
const IT_HCMIU_URL = 'https://it.hcmiu.edu.vn/category/announcement';
const IU_OSS = 'https://iuoss.com/category/activities-programs';

const formatDate = (input: string): string => {
  const split = input.split('/');
  const formattedDay = [split[1], split[0], split[2]].join('/');
  return formattedDay;
};

//------------------------------------------------------
const isNewAnnounce = (inputDay: string): boolean => {
  const today = new Date().toLocaleDateString();
  const inputDateFormatted = formatDate(inputDay);
  const day1: any = new Date(today);
  const day2: any = new Date(inputDateFormatted);
  const diffTime = Math.abs(day2 - day1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 7) {
    return false;
  }
  return true;
};

// -----------------------------------------------
const crawlData = async (req: Request, res: Response): Promise<any> => {
  let announcements = [];
  const { web } = req?.query;
  switch (web) {
    case 'edu':
      await axios
        .get(`${EDU_URL}/default.aspx?page=danhsachthongtin&type=0`)
        .then((response) => {
          const html = response.data;
          const $ = load(html);
          const textTitles = $('.TextTitle');
          textTitles.each((_index: number, el: any): any => {
            const href = $(el).attr('href');
            const message = $(el)
              .text()
              .replace(/[\.]+ \(\d{2}\/\d{2}\/\d{4}\)/g, '');
            const date = $(el).find('.NgayTitle').text().replace(/[()]/g, '');
            const isNewPost = isNewAnnounce(date);
            const dataAnnouncement = {
              link: `${EDU_URL}/${href}`,
              message,
              date,
              isNewPost,
            };

            announcements.push(dataAnnouncement);
          });
        })
        .catch((error) => {
          console.log(error);
        });

      const filteredAnnouncements = announcements.filter((items) => {
       return items.message && items.date;
      });

      console.log(filteredAnnouncements);
      return res.status(200).json({
        message: 'Get Announcements Successfully!',
        data: filteredAnnouncements,
      });
    case 'it_hcmiu':
      await axios
        .get(IT_HCMIU_URL)
        .then((response) => {
          const html = response.data;
          const $ = load(html);
          $('article').each((_i, el) => {
            const postTitle = $(el).find('.entry-title').text().trim();
            const link = $(el).find('a').attr('href');

            const day = $(el).find('.day');
            const month = $(el).find('.month');
            const year = $(el).find('.year');
            const date = `${day.text()} ${month.text()} ${year.text()}`;
            const newFormatDate = date.replace(' ', '/');
            const isNewPost = isNewAnnounce(newFormatDate);
            const dataAnnouncement = {
              date: date,
              message: postTitle,
              isNewPost,
              link,
            };
            announcements.push(dataAnnouncement);
          });
        })
        .catch((error) => {
          console.log(error);
        });

      return res.status(200).json({
        message: 'Get Announcements IT HCMIU Successfully!',
        data: announcements,
      });
    case 'iuoss':
      await axios
        .get(IU_OSS)
        .then((response) => {
          const html = response.data;
          const $ = load(html);
          $('.jeg_post_info').each((_i, el) => {
            const postTitle = $(el).find('.jeg_post_title').text().trim();
            const date = $(el).find('.jeg_meta_date').text().trim();
            const link = $(el).find('.jeg_post_title').find('a').attr('href');
            const isNewPost = isNewAnnounce(date);
            const dataAnnouncement = {
              message: postTitle,
              link,
              isNewPost,
              date,
            };
            announcements.push(dataAnnouncement);
          });

          $('.jeg_postblock_content').each((_i, el) => {
            const postTitle = $(el).find('.jeg_post_title').text().trim();
            const date = $(el).find('.jeg_meta_date').text().trim();
            const link = $(el).find('.jeg_post_title').find('a').attr('href');

            const dataAnnouncement = {
              message: postTitle,
              link,
              date,
            };
            announcements.push(dataAnnouncement);
          });
        })
        .catch((error) => {
          console.log(error);
        });

      return res.status(200).json({
        message: 'Get Announcements IU OSS Successfully!',
        data: announcements,
      });
    default:
      return;
  }
};

// -----------------------------------------------
app.get('/', crawlData);

// -----------------------------------------------
app.listen(port, () => {
  console.log(
    `⚡️[CRAWLER]: Crawler Server is running at http://localhost:${port}`
  );
});
