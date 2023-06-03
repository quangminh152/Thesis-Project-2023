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
		collection.Schema.RemoveField("lywgrgrl")

		// update
		edit_course := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "rlluxruc",
			"name": "course",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"collectionId": "narak07qcl3ekdk",
				"cascadeDelete": false
			}
		}`), edit_course)
		collection.Schema.AddField(edit_course)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("eu4trctg1zwhn61")
		if err != nil {
			return err
		}

		// add
		del_student := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "lywgrgrl",
			"name": "student",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"collectionId": "_pb_users_auth_",
				"cascadeDelete": false
			}
		}`), del_student)
		collection.Schema.AddField(del_student)

		// update
		edit_course := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "rlluxruc",
			"name": "class",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"collectionId": "zcr9igpnnm9v5s8",
				"cascadeDelete": false
			}
		}`), edit_course)
		collection.Schema.AddField(edit_course)

		return dao.SaveCollection(collection)
	})
}
