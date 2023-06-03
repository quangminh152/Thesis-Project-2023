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

		// remove
		collection.Schema.RemoveField("sejvjspg")

		// remove
		collection.Schema.RemoveField("fzbsno0d")

		// remove
		collection.Schema.RemoveField("dooesgqj")

		// remove
		collection.Schema.RemoveField("5qpsrvuz")

		// remove
		collection.Schema.RemoveField("vnfauysd")

		// remove
		collection.Schema.RemoveField("k5zfavjv")

		// remove
		collection.Schema.RemoveField("lfzz9q0l")

		// remove
		collection.Schema.RemoveField("pgouuedb")

		// add
		new_lecturerName := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
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
		}`), new_lecturerName)
		collection.Schema.AddField(new_lecturerName)

		// add
		new_lecturerMail := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
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
		}`), new_lecturerMail)
		collection.Schema.AddField(new_lecturerMail)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("zcr9igpnnm9v5s8")
		if err != nil {
			return err
		}

		// add
		del_totalSlots := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "sejvjspg",
			"name": "totalSlots",
			"type": "number",
			"required": true,
			"unique": false,
			"options": {
				"min": 1,
				"max": null
			}
		}`), del_totalSlots)
		collection.Schema.AddField(del_totalSlots)

		// add
		del_remainingSlots := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "fzbsno0d",
			"name": "remainingSlots",
			"type": "number",
			"required": true,
			"unique": false,
			"options": {
				"min": null,
				"max": null
			}
		}`), del_remainingSlots)
		collection.Schema.AddField(del_remainingSlots)

		// add
		del_day := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "dooesgqj",
			"name": "day",
			"type": "text",
			"required": true,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), del_day)
		collection.Schema.AddField(del_day)

		// add
		del_startPeriod := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "5qpsrvuz",
			"name": "startPeriod",
			"type": "number",
			"required": true,
			"unique": false,
			"options": {
				"min": null,
				"max": null
			}
		}`), del_startPeriod)
		collection.Schema.AddField(del_startPeriod)

		// add
		del_numberOfPeriod := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "vnfauysd",
			"name": "numberOfPeriod",
			"type": "number",
			"required": true,
			"unique": false,
			"options": {
				"min": null,
				"max": null
			}
		}`), del_numberOfPeriod)
		collection.Schema.AddField(del_numberOfPeriod)

		// add
		del_lecturerInfo := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "k5zfavjv",
			"name": "lecturerInfo",
			"type": "json",
			"required": true,
			"unique": false,
			"options": {}
		}`), del_lecturerInfo)
		collection.Schema.AddField(del_lecturerInfo)

		// add
		del_durationStart := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "lfzz9q0l",
			"name": "durationStart",
			"type": "date",
			"required": true,
			"unique": false,
			"options": {
				"min": "",
				"max": ""
			}
		}`), del_durationStart)
		collection.Schema.AddField(del_durationStart)

		// add
		del_durationEnd := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "pgouuedb",
			"name": "durationEnd",
			"type": "date",
			"required": true,
			"unique": false,
			"options": {
				"min": "",
				"max": ""
			}
		}`), del_durationEnd)
		collection.Schema.AddField(del_durationEnd)

		// remove
		collection.Schema.RemoveField("fg4qu29s")

		// remove
		collection.Schema.RemoveField("1iwbq14k")

		return dao.SaveCollection(collection)
	})
}
