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
			"id": "v7ga8m74krd9zct",
			"created": "2023-04-15 04:38:16.651Z",
			"updated": "2023-04-15 04:38:16.651Z",
			"name": "majors",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "8vhxy7zp",
					"name": "name",
					"type": "text",
					"required": true,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
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

		collection, err := dao.FindCollectionByNameOrId("v7ga8m74krd9zct")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
