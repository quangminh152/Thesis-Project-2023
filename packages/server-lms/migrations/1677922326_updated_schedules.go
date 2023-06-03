package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("qoyog1xq1pd7889")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("anvj7zbz")

		// remove
		collection.Schema.RemoveField("hzoh0x2i")

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("qoyog1xq1pd7889")
		if err != nil {
			return err
		}

		// add
		del_classMaterial := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "anvj7zbz",
			"name": "classMaterial",
			"type": "file",
			"required": false,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"maxSize": 5242880,
				"mimeTypes": [],
				"thumbs": []
			}
		}`), del_classMaterial)
		collection.Schema.AddField(del_classMaterial)

		// add
		del_studentNote := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "hzoh0x2i",
			"name": "studentNote",
			"type": "file",
			"required": false,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"maxSize": 5242880,
				"mimeTypes": [],
				"thumbs": []
			}
		}`), del_studentNote)
		collection.Schema.AddField(del_studentNote)

		return dao.SaveCollection(collection)
	})
}
