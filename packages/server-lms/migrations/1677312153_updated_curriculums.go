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

		collection.Name = "schedules"

		// add
		new_studentNote := &schema.SchemaField{}
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
		}`), new_studentNote)
		collection.Schema.AddField(new_studentNote)

		// update
		edit_session := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "ge9vtuqw",
			"name": "session",
			"type": "number",
			"required": true,
			"unique": false,
			"options": {
				"min": 1,
				"max": 15
			}
		}`), edit_session)
		collection.Schema.AddField(edit_session)

		// update
		edit_course := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "ffjgq1bi",
			"name": "course",
			"type": "relation",
			"required": true,
			"unique": true,
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

		collection, err := dao.FindCollectionByNameOrId("qoyog1xq1pd7889")
		if err != nil {
			return err
		}

		collection.Name = "curriculums"

		// remove
		collection.Schema.RemoveField("hzoh0x2i")

		// update
		edit_session := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "ge9vtuqw",
			"name": "period",
			"type": "number",
			"required": true,
			"unique": false,
			"options": {
				"min": null,
				"max": null
			}
		}`), edit_session)
		collection.Schema.AddField(edit_session)

		// update
		edit_course := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "ffjgq1bi",
			"name": "class",
			"type": "relation",
			"required": true,
			"unique": true,
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
