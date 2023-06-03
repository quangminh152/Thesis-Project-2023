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

		collection, err := dao.FindCollectionByNameOrId("zay406y2qxsgfvo")
		if err != nil {
			return err
		}

		// update
		edit_enrollmentYear := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "kzwemdaa",
			"name": "enrollmentYear",
			"type": "text",
			"required": true,
			"unique": true,
			"options": {
				"min": 3,
				"max": 3,
				"pattern": ""
			}
		}`), edit_enrollmentYear)
		collection.Schema.AddField(edit_enrollmentYear)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("zay406y2qxsgfvo")
		if err != nil {
			return err
		}

		// update
		edit_enrollmentYear := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "kzwemdaa",
			"name": "enrollmentYear",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": 3,
				"max": 3,
				"pattern": ""
			}
		}`), edit_enrollmentYear)
		collection.Schema.AddField(edit_enrollmentYear)

		return dao.SaveCollection(collection)
	})
}
