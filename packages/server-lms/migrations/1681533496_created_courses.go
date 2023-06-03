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
			"id": "narak07qcl3ekdk",
			"created": "2023-04-15 04:38:16.651Z",
			"updated": "2023-04-15 04:38:16.651Z",
			"name": "courses",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "osqbgqua",
					"name": "name",
					"type": "text",
					"required": true,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "vmwja1fx",
					"name": "credit",
					"type": "number",
					"required": true,
					"unique": false,
					"options": {
						"min": 1,
						"max": 10
					}
				},
				{
					"system": false,
					"id": "fjdh8gtx",
					"name": "major",
					"type": "relation",
					"required": true,
					"unique": false,
					"options": {
						"collectionId": "v7ga8m74krd9zct",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": 10,
						"displayFields": null
					}
				},
				{
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
				},
				{
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
				},
				{
					"system": false,
					"id": "2vnxoi7u",
					"name": "isElective",
					"type": "bool",
					"required": false,
					"unique": false,
					"options": {}
				},
				{
					"system": false,
					"id": "9cc0kmbg",
					"name": "enrollmentYear",
					"type": "relation",
					"required": true,
					"unique": false,
					"options": {
						"collectionId": "zay406y2qxsgfvo",
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

		collection, err := dao.FindCollectionByNameOrId("narak07qcl3ekdk")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
