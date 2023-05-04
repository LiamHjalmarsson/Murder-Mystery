
import { PubSub } from "../utilities/pubsub.js";
import { updateArrayMap, realTime, getUserDoc, 
    addDocAddData, getFromDB, docUpdate,
    docUpdateArry } from "../utilities/functions/firebase_functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "test",
        listener: test
    });

})();

async function test () {
    // let data = await getUserDoc("1", "123456");
    // console.log(data);

    // let dataDB = await getFromDB("storyTelling");
    // let dataDB = await getFromDB("storyTelling", "chapterOne");
    // console.log(dataDB);

    // let newData = {
    //     username: "testUser",
    //     locations: [1, 2, 3],
    //     password: 123456
    // }
    
    // let user = await addDocAddData("new", newData);
    // let user = await addDocAddData("new", newData, "try");
    // console.log("user", user);

    // let updateValue = { hello: false }
    // let update = await docUpdate("new", "try", updateValue);
    // console.log(update);

    // let updateArray = docUpdateArry("users", "LYTRzWbGVlNmU9w8DFOv", "chapters", { onGoing: true } );
    // console.log(updateArray);

    let updateArrayMaps = await updateArrayMap('users', 'LYTRzWbGVlNmU9w8DFOv', 'chapters', 5, { onGoing: false });
    console.log(updateArrayMaps);
}