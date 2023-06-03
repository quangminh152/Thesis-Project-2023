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

		collection, err := dao.FindCollectionByNameOrId("narak07qcl3ekdk")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("hqc2rsbk")

		// add
		new_enrollmentYear := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "9cc0kmbg",
			"name": "enrollmentYear",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"collectionId": "zay406y2qxsgfvo",
				"cascadeDelete": false
			}
		}`), new_enrollmentYear)
		collection.Schema.AddField(new_enrollmentYear)

		// update
		edit_yearCurri := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "aitcgr2g",
			"name": "yearCurri",
			"type": "number",
			"required": false,
			"unique": false,
			"options": {
				"min": 2015,
				"max": null
			}
		}`), edit_yearCurri)
		collection.Schema.AddField(edit_yearCurri)

		// update
		edit_semesterCurri := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "rzo5yz2h",
			"name": "semesterCurri",
			"type": "number",
			"required": false,
			"unique": false,
			"options": {
				"min": 1,
				"max": 2
			}
		}`), edit_semesterCurri)
		collection.Schema.AddField(edit_semesterCurri)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("narak07qcl3ekdk")
		if err != nil {
			return err
		}

		// add
		del_isComplete := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "hqc2rsbk",
			"name": "isComplete",
			"type": "bool",
			"required": false,
			"unique": false,
			"options": {}
		}`), del_isComplete)
		collection.Schema.AddField(del_isComplete)

		// remove
		collection.Schema.RemoveField("9cc0kmbg")

		// update
		edit_yearCurri := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "aitcgr2g",
			"name": "year",
			"type": "number",
			"required": false,
			"unique": false,
			"options": {
				"min": 2015,
				"max": null
			}
		}`), edit_yearCurri)
		collection.Schema.AddField(edit_yearCurri)

		// update
		edit_semesterCurri := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "rzo5yz2h",
			"name": "semester",
			"type": "number",
			"required": false,
			"unique": false,
			"options": {
				"min": 1,
				"max": 2
			}
		}`), edit_semesterCurri)
		collection.Schema.AddField(edit_semesterCurri)

		return dao.SaveCollection(collection)
	})
}
