package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models/schema"
	"github.com/pocketbase/pocketbase/tools/types"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("eu4trctg1zwhn61")
		if err != nil {
			return err
		}

		collection.ListRule = types.Pointer("")

		collection.ViewRule = types.Pointer("")

		collection.CreateRule = types.Pointer("")

		collection.UpdateRule = types.Pointer("")

		collection.DeleteRule = types.Pointer("")

		// add
		new_student := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "ybgjxxc7",
			"name": "student",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"collectionId": "_pb_users_auth_",
				"cascadeDelete": false
			}
		}`), new_student)
		collection.Schema.AddField(new_student)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("eu4trctg1zwhn61")
		if err != nil {
			return err
		}

		collection.ListRule = nil

		collection.ViewRule = nil

		collection.CreateRule = nil

		collection.UpdateRule = nil

		collection.DeleteRule = nil

		// remove
		collection.Schema.RemoveField("ybgjxxc7")

		return dao.SaveCollection(collection)
	})
}
