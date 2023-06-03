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
			"id": "zay406y2qxsgfvo",
			"created": "2023-04-15 04:38:16.653Z",
			"updated": "2023-04-15 04:38:16.653Z",
			"name": "enrollmentYears",
			"type": "base",
			"system": false,
			"schema": [
				{
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

		collection, err := dao.FindCollectionByNameOrId("zay406y2qxsgfvo")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
