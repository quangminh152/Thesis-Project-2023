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

		collection, err := dao.FindCollectionByNameOrId("zcr9igpnnm9v5s8")
		if err != nil {
			return err
		}

		collection.Name = "classesInformation"

		// remove
		collection.Schema.RemoveField("m6yx1qqb")

		// add
		new_student := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "r8ywxlv1",
			"name": "student",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"collectionId": "_pb_users_auth_",
				"cascadeDelete": false
			}
		}`), new_student)
		collection.Schema.AddField(new_student)

		// add
		new_isCompleted := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "r0c3sj4m",
			"name": "isCompleted",
			"type": "bool",
			"required": false,
			"unique": false,
			"options": {}
		}`), new_isCompleted)
		collection.Schema.AddField(new_isCompleted)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("zcr9igpnnm9v5s8")
		if err != nil {
			return err
		}

		collection.Name = "classes"

		// add
		del_name := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "m6yx1qqb",
			"name": "name",
			"type": "text",
			"required": true,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), del_name)
		collection.Schema.AddField(del_name)

		// remove
		collection.Schema.RemoveField("r8ywxlv1")

		// remove
		collection.Schema.RemoveField("r0c3sj4m")

		return dao.SaveCollection(collection)
	})
}
