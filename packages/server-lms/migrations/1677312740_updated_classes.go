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

		collection, err := dao.FindCollectionByNameOrId("zcr9igpnnm9v5s8")
		if err != nil {
			return err
		}

		// add
		new_semesterStudy := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
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
		}`), new_semesterStudy)
		collection.Schema.AddField(new_semesterStudy)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("zcr9igpnnm9v5s8")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("bj9xxmhm")

		return dao.SaveCollection(collection)
	})
}
