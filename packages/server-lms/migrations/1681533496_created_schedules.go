package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		jsonData := `{
			"id": "qoyog1xq1pd7889",
			"created": "2023-04-15 04:38:16.652Z",
			"updated": "2023-04-15 04:38:16.652Z",
			"name": "schedules",
			"type": "base",
			"system": false,
			"schema": [
				{
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
				},
				{
					"system": false,
					"id": "aqjbrtfg",
					"name": "content",
					"type": "text",
					"required": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "ffjgq1bi",
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
				}
			],
			"listRule": "",
			"viewRule": "",
			"createRule": "",
			"updateRule": "",
			"deleteRule": "",
			"options": {}
		}`

		collection := &models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return daos.New(db).SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("qoyog1xq1pd7889")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
