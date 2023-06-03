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

		// remove
		collection.Schema.RemoveField("rlluxruc")

		// remove
		collection.Schema.RemoveField("ybgjxxc7")

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("eu4trctg1zwhn61")
		if err != nil {
			return err
		}

		// add
		del_course := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "rlluxruc",
			"name": "course",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"collectionId": "narak07qcl3ekdk",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), del_course)
		collection.Schema.AddField(del_course)

		// add
		del_student := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "ybgjxxc7",
			"name": "student",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"collectionId": "_pb_users_auth_",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), del_student)
		collection.Schema.AddField(del_student)

		return dao.SaveCollection(collection)
	})
}
