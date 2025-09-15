

## Setup


nelson.wang80@bcmail.cuny.edu


nelsonwang80
qUDQSg6KalrlOlF0


```
mongosh "mongodb+srv://cluster0.ertar9x.mongodb.net/" --apiVersion 1 --username nelsonwang80 --password qUDQSg6KalrlOlF0
```




## 🧰 Common MongoDB Shell Operations

### 🧼 **Delete Operations**

- **Delete one document:**
    

```js
db.myCollection.deleteOne({ name: "Alice" })
```

- **Delete multiple documents:**
    

```js
db.myCollection.deleteMany({ age: { $gt: 25 } })
```

---

### ✏️ **Update Operations**

- **Update one document:**
    

```js
db.myCollection.updateOne(
  { name: "Bob" },
  { $set: { age: 35 } }
)
```

- **Update many documents:**
    

```js
db.myCollection.updateMany(
  { age: { $lt: 30 } },
  { $inc: { age: 1 } }
)
```

---

### 🔍 **Query / Find Specific Documents**

- **Find by exact match:**
    

```js
db.myCollection.find({ name: "Charlie" })
```

- **Find by comparison:**
    

```js
db.myCollection.find({ age: { $gt: 25 } })
```

- **Find with logical operator:**
    

```js
db.myCollection.find({
  $or: [ { age: { $lt: 20 } }, { name: "Bob" } ]
})
```

- **Find and project only specific fields:**
    

```js
db.myCollection.find({ age: { $gt: 25 } }, { name: 1, _id: 0 })
```

---

## 📇 Flashcards

|Question|Answer|
|---|---|
|How do you switch to a database in MongoDB?|`use myDatabase`|
|How do you list all databases?|`show dbs`|
|How do you show all collections in the current DB?|`show collections`|
|How do you insert one document?|`db.collection.insertOne({ ... })`|
|How do you insert multiple documents?|`db.collection.insertMany([ ... ])`|
|How do you find all documents in a collection?|`db.collection.find()`|
|How do you pretty-print documents?|`db.collection.find().pretty()`|
|How do you delete one document by filter?|`db.collection.deleteOne({ ... })`|
|How do you delete documents matching a condition?|`db.collection.deleteMany({ ... })`|
|How do you update one document?|`db.collection.updateOne({ filter }, { $set: { ... } })`|
|How do you update many documents?|`db.collection.updateMany({ filter }, { $inc / $set: { ... } })`|
|How do you find documents with age > 25?|`db.collection.find({ age: { $gt: 25 } })`|
|How do you find documents with age < 20 or name = "Bob"?|`db.collection.find({ $or: [ { age: { $lt: 20 } }, { name: "Bob" } ] })`|
|How do you project only the name field from a query?|`db.collection.find({ ... }, { name: 1, _id: 0 })`|






