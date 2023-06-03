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
			"id": "zcr9igpnnm9v5s8",
			"created": "2023-04-15 04:38:16.651Z",
			"updated": "2023-04-15 04:38:16.651Z",
			"name": "classesInformation",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "igzrkmfh",
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
				},
				{
					"system": false,
					"id": "bdmftsjm",
					"name": "room",
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
					"id": "fg4qu29s",
					"name": "lecturerName",
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
					"id": "1iwbq14k",
					"name": "lecturerMail",
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
					"id": "bj9xxmhm",
					"name": "semesterStudy",
					"type": "select",
					"required": false,
					"unique": false,
					"options": {
						"maxSelect": 1,
						"values": [
							"Year 1 - Semester 1",
							"Year 1 - Semester 2",
							"Year 2 - Semester 1",
							"Year 2 - Semester 2",
							"Year 3 - Semester 1",
							"Year 3 - Semester 2",
							"Year 4 - Semester 1",
							"Year 4 - Semester 2"
						]
					}
				},
				{
					"system": false,
					"id": "r8ywxlv1",
					"name": "student",
					"type": "relation",
					"required": true,
					"unique": false,
					"options": {
						"collectionId": "_pb_users_auth_",
						"cascadeDelete": false,
						"minSelect": null,
						"maxSelect": 1,
						"displayFields": null
					}
				},
				{
					"system": false,
					"id": "r0c3sj4m",
					"name": "isCompleted",
					"type": "bool",
					"required": false,
					"unique": false,
					"options": {}
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

		collection, err := dao.FindCollectionByNameOrId("zcr9igpnnm9v5s8")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
