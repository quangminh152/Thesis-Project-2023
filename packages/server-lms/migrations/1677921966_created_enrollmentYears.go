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
			"created": "2023-03-04 09:26:06.247Z",
			"updated": "2023-03-04 09:26:06.247Z",
			"name": "enrollmentYears",
			"type": "base",
			"system": false,
			"schema": [
				{
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
				}
			],
			"listRule": null,
			"viewRule": null,
			"createRule": null,
			"updateRule": null,
			"deleteRule": null,
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
