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

		// update
		edit_gradeInclass := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "t2c46akg",
			"name": "gradeInclass",
			"type": "number",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null
			}
		}`), edit_gradeInclass)
		collection.Schema.AddField(edit_gradeInclass)

		// update
		edit_gradeMid := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "yfevziho",
			"name": "gradeMid",
			"type": "number",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null
			}
		}`), edit_gradeMid)
		collection.Schema.AddField(edit_gradeMid)

		// update
		edit_gradeFinal := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "nmbhstv6",
			"name": "gradeFinal",
			"type": "number",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null
			}
		}`), edit_gradeFinal)
		collection.Schema.AddField(edit_gradeFinal)

		// update
		edit_gradeOverallNumber := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "mns1m1u0",
			"name": "gradeOverallNumber",
			"type": "number",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null
			}
		}`), edit_gradeOverallNumber)
		collection.Schema.AddField(edit_gradeOverallNumber)

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

		// remove
		collection.Schema.RemoveField("jfkaqbpd")

		// update
		edit_gradeInclass := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "t2c46akg",
			"name": "gradeInclass",
			"type": "number",
			"required": true,
			"unique": false,
			"options": {
				"min": null,
				"max": null
			}
		}`), edit_gradeInclass)
		collection.Schema.AddField(edit_gradeInclass)

		// update
		edit_gradeMid := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "yfevziho",
			"name": "gradeMid",
			"type": "number",
			"required": true,
			"unique": false,
			"options": {
				"min": null,
				"max": null
			}
		}`), edit_gradeMid)
		collection.Schema.AddField(edit_gradeMid)

		// update
		edit_gradeFinal := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "nmbhstv6",
			"name": "gradeFinal",
			"type": "number",
			"required": true,
			"unique": false,
			"options": {
				"min": null,
				"max": null
			}
		}`), edit_gradeFinal)
		collection.Schema.AddField(edit_gradeFinal)

		// update
		edit_gradeOverallNumber := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "mns1m1u0",
			"name": "gradeOverallNumber",
			"type": "number",
			"required": true,
			"unique": false,
			"options": {
				"min": null,
				"max": null
			}
		}`), edit_gradeOverallNumber)
		collection.Schema.AddField(edit_gradeOverallNumber)

		return dao.SaveCollection(collection)
	})
}
