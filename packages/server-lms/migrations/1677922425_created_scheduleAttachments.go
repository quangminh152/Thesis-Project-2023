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
			"id": "5v0dybjtw3d14ah",
			"created": "2023-03-04 09:33:45.912Z",
			"updated": "2023-03-04 09:33:45.912Z",
			"name": "scheduleAttachments",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "o4oneumb",
					"name": "slide",
					"type": "file",
					"required": false,
					"unique": false,
					"options": {
						"maxSelect": 10,
						"maxSize": 5242880,
						"mimeTypes": [],
						"thumbs": []
					}
				},
				{
					"system": false,
					"id": "zvtbp8s5",
					"name": "note",
					"type": "file",
					"required": false,
					"unique": false,
					"options": {
						"maxSelect": 10,
						"maxSize": 5242880,
						"mimeTypes": [],
						"thumbs": []
					}
				},
				{
					"system": false,
					"id": "wiuiklog",
					"name": "student",
					"type": "relation",
					"required": true,
					"unique": false,
					"options": {
						"maxSelect": 1,
						"collectionId": "_pb_users_auth_",
						"cascadeDelete": false
					}
				},
				{
					"system": false,
					"id": "iy9c4uie",
					"name": "schedule",
					"type": "relation",
					"required": true,
					"unique": false,
					"options": {
						"maxSelect": 1,
						"collectionId": "qoyog1xq1pd7889",
						"cascadeDelete": false
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

		collection, err := dao.FindCollectionByNameOrId("5v0dybjtw3d14ah")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
