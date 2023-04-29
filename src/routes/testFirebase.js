
import { PubSub } from "../utilities/pubsub.js";
import { realTime, getUserDoc, addDocAddData, getFromDB, docUpdate, docUpdateArry } from "../utilities/functions/firebase_functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "test",
        listener: test
    });

})();

async function test () {
    // let data = await getUserDoc("123456", "123456");
    // console.log(data);

    // let dataDB = await getFromDB("storyTelling");
    // let dataDB = await getFromDB("storyTelling", "chapterOne");
    // console.log(dataDB);

    // let newData = {
    //     username: "testUser",
    //     locations: [1, 2, 3]
    // }
    
    // // let user = await addDocAddData("new", newData);
    // let user = await addDocAddData("new", newData, "try");
    // console.log("user", user);

    // let updateValue = { key : "värde"} 
    // let update = await docUpdate("new", "new", updateValue);
    // console.log(update);
}