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
