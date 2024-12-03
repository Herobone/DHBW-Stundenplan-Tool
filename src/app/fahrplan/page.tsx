import { headers } from "next/headers";

export default function Fahrplan() {

    // test
    /*
        const URL = 'https://apis.deutschebahn.com/db-api-marketplace/apis/timetables/v1/fchg/8000105';
        fetch(URL, {
            method: 'get',
            headers: new Headers({
                'DB-Client-Id': '0d56263e6d0e8ac4fb9501a89cb63f4c',
                'DB-Api-Key': '2d0986e4e661e7661fd28dbee05420ce',
                accept: 'application/xml'
            })
        })
        .then((response) => console.log(response));
    */
    // test ende

    // test1
    /*
        fetch('https://apis.deutschebahn.com/db-api-marketplace/apis/timetables/v1/fchg/8000105', {
            method: 'get',
            headers: new Headers({
                'DB-Client-Id': '0d56263e6d0e8ac4fb9501a89cb63f4c',
                'DB-Api-Key': '2d0986e4e661e7661fd28dbee05420ce',
                accept: 'application/xml'
                // accept: 'json'
            })
        })
        // .then(response => response.json())
        // .then(data => console.log(data));
        .then(response => console.log(response))
    */
    // test1 ende

    // test2
    componentDidMount() 
    {
        var self = this;
        axios.get("https://apis.deutschebahn.com/db-api-marketplace/apis/timetables/v1/fchg/8000105", {
            "Content-Type": "application/xml; charset=utf-8"
        })
        .then(function(response)) {
            self.setState({authors: response.data});
        }
        .catch(function(error)) {
            console.log(error);
        }
    }
    // test2 ende
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 
                className="text-4xl font-bold">Fahrplan
            </h1>
            <ul>

            </ul>
        </div>
    );
}