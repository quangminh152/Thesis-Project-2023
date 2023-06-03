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

		collection, err := dao.FindCollectionByNameOrId("eu4trctg1zwhn61")
		if err != nil {
			return err
		}

		// add
		new_classesInformation := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "jfkaqbpd",
			"name": "classesInformation",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"collectionId": "zcr9igpnnm9v5s8",
				"cascadeDelete": true,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": []
			}
		}`), new_classesInformation)
		collection.Schema.AddField(new_classesInformation)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("eu4trctg1zwhn61")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("jfkaqbpd")

		return dao.SaveCollection(collection)
	})
}
