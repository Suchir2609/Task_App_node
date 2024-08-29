const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager'
const databaseName = 'task-manager'

const client = new MongoClient(connectionURL) 

async function run(){
	await client.connect()
	console.log('connected to database')
	db = client.db('task-manager')

//DELETE

	db.collection('tasks').deleteOne({
		description: 'clean the room'
	}).then((result)=>{
		console.log(result)
	}).catch((error)=>{
		console.log(error)
	})


//UPDATE

	// db.collection('tasks').updateMany({
	// 	completed : true
	// }, {
	// 	$set:{
	// 		completed: false
	// 	}
	// }).then((result)=>{
	// 	console.log(result.modifiedCount)
	// }).catch((error)=>{
	// 	console.log(error)
	// })

//READ

	// const result = await db.collection('tasks').findOne({_id : new ObjectId('6594f51c1e90fcfb3a194ae7')})
	// if (result){
	// 	console.log(result)
	// } else {
	// 	console.log('data does not exist')
	// }	
	
	// const result2 = await db.collection('tasks').find({completed : true}).toArray()
	// if (result2){
	// 	console.log(result2)
	// } else {
	// 	console.log('unable to fetch data')
	// }


//CREATE

	//await listdabases(client)
	// await createListing(client,
	// 	{
	// 		name: "Suchir",
	// 		age: 27
	// 	}
	// )
	
	// 	db.collection('tasks').insertMany([{
	// 		description : 'charge the laptop',
	// 		completed: true
	// 	},{
	// 		description: 'clean the room',
	// 		completed: true
	// 	},{
	// 		description : 'buy a book',
	// 		completed : false
	// 	}])

	// await client.close()
	}


async function listdabases(client){
	databasesList = await client.db().admin().listDatabases()
 
    console.log("Databases:")
    databasesList.databases.forEach(db => console.log(` - ${db.name}`))
}

async function createListing(client, newListing){
    const result = await db.collection("users").insertOne(newListing)

    //console.log(`New listing created with the following id: ${result.insertedId}`)
}

run().catch(console.dir)

