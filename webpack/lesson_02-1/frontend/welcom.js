/**
 * Created by Balyuk-D on 10.03.2017.
 */

export default function(message) {
    //debugger;
    if (NODE_ENV == 'development'){
        console.log(message);
    }

    console.log(process.env.USER);

    alert(`Welcome ${message}`);
};