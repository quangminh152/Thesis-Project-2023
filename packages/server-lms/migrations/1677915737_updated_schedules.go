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

		// update
		edit_course := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "ffjgq1bi",
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

		collection, err := dao.FindCollectionByNameOrId("qoyog1xq1pd7889")
		if err != nil {
			return err
		}

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
	})
}
