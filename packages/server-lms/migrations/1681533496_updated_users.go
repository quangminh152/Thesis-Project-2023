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

		collection, err := dao.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// add
		new_studentID := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "zr6tfeaf",
			"name": "studentID",
			"type": "text",
			"required": true,
			"unique": true,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), new_studentID)
		collection.Schema.AddField(new_studentID)

		// add
		new_last_name := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "plepp4v3",
			"name": "last_name",
			"type": "text",
			"required": true,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), new_last_name)
		collection.Schema.AddField(new_last_name)

		// add
		new_phone := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "bs38hrb3",
			"name": "phone",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": 10,
				"max": 10,
				"pattern": ""
			}
		}`), new_phone)
		collection.Schema.AddField(new_phone)

		// add
		new_shcd_dk := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "qyn77t5w",
			"name": "shcd_dk",
			"type": "bool",
			"required": false,
			"unique": false,
			"options": {}
		}`), new_shcd_dk)
		collection.Schema.AddField(new_shcd_dk)

		// add
		new_shcd_gk1 := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "byopfjqi",
			"name": "shcd_gk1",
			"type": "bool",
			"required": false,
			"unique": false,
			"options": {}
		}`), new_shcd_gk1)
		collection.Schema.AddField(new_shcd_gk1)

		// add
		new_shcd_gk2 := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "p3lb8tyg",
			"name": "shcd_gk2",
			"type": "bool",
			"required": false,
			"unique": false,
			"options": {}
		}`), new_shcd_gk2)
		collection.Schema.AddField(new_shcd_gk2)

		// add
		new_shcd_ck := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "bugqzfdf",
			"name": "shcd_ck",
			"type": "bool",
			"required": false,
			"unique": false,
			"options": {}
		}`), new_shcd_ck)
		collection.Schema.AddField(new_shcd_ck)

		// add
		new_major := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "c6wibh9n",
			"name": "major",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"collectionId": "v7ga8m74krd9zct",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), new_major)
		collection.Schema.AddField(new_major)

		// add
		new_englishCertificate := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "w7td1lgz",
			"name": "englishCertificate",
			"type": "bool",
			"required": false,
			"unique": false,
			"options": {}
		}`), new_englishCertificate)
		collection.Schema.AddField(new_englishCertificate)

		// add
		new_enrollmentYear := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "czosoxak",
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
		}`), new_enrollmentYear)
		collection.Schema.AddField(new_enrollmentYear)

		// update
		edit_first_name := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "users_name",
			"name": "first_name",
			"type": "text",
			"required": true,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_first_name)
		collection.Schema.AddField(edit_first_name)

		// update
		edit_avatar := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "users_avatar",
			"name": "avatar",
			"type": "file",
			"required": false,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"maxSize": 5242880,
				"mimeTypes": [
					"image/jpg",
					"image/jpeg",
					"image/png",
					"image/svg+xml",
					"image/gif",
					"image/webp"
				],
				"thumbs": null
			}
		}`), edit_avatar)
		collection.Schema.AddField(edit_avatar)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("zr6tfeaf")

		// remove
		collection.Schema.RemoveField("plepp4v3")

		// remove
		collection.Schema.RemoveField("bs38hrb3")

		// remove
		collection.Schema.RemoveField("qyn77t5w")

		// remove
		collection.Schema.RemoveField("byopfjqi")

		// remove
		collection.Schema.RemoveField("p3lb8tyg")

		// remove
		collection.Schema.RemoveField("bugqzfdf")

		// remove
		collection.Schema.RemoveField("c6wibh9n")

		// remove
		collection.Schema.RemoveField("w7td1lgz")

		// remove
		collection.Schema.RemoveField("czosoxak")

		// update
		edit_first_name := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "users_name",
			"name": "name",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_first_name)
		collection.Schema.AddField(edit_first_name)

		// update
		edit_avatar := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "users_avatar",
			"name": "avatar",
			"type": "file",
			"required": false,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"maxSize": 5242880,
				"mimeTypes": [
					"image/jpeg",
					"image/png",
					"image/svg+xml",
					"image/gif",
					"image/webp"
				],
				"thumbs": null
			}
		}`), edit_avatar)
		collection.Schema.AddField(edit_avatar)

		return dao.SaveCollection(collection)
	})
}
