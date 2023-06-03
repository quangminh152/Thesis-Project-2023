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
		new_enrollmentYear := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "czosoxak",
			"name": "enrollmentYear",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"collectionId": "zay406y2qxsgfvo",
				"cascadeDelete": false
			}
		}`), new_enrollmentYear)
		collection.Schema.AddField(new_enrollmentYear)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("czosoxak")

		return dao.SaveCollection(collection)
	})
}
