const Announcement = ({ data }: any) => {
  const announcementData = data?.data;
  return (
    announcementData?.length > 0 &&
    announcementData?.map((items: any, index: number) => {
      console.log(items);
      return (
        <div key={`post_${index}`} className="p-1 py-2">
          <a
            target="_blank"
            className={"visited:text-purple-700"}
            href={items.link}
          >
            <div className="flex">
              {items.isNewPost && (
                <p className="bg-green-500 px-1 mr-10 text-white">New</p>
              )}
              <div className="flex justify-between">
                <p className={"pr-20 text-lg hover:underline"}>
                  {items.message}
                </p>
                <p className="text-red-500">{items.date}</p>
              </div>
            </div>
          </a>
        </div>
      );
    })
  );
};

export default Announcement;
