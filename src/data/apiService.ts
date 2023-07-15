import axios from "axios";
import { initMockApiCalls } from "../tests/data/apiServiceMocks";

//Set this to true to enable test mode, meaning use mock server connection instead of real.
const TEST_MODE = false;
if (TEST_MODE) {
    initMockApiCalls();
}

export default axios.create({
    baseURL: 'https://gradesproserver.azurewebsites.net/',
    headers: {
        'Content-Type': 'application/json',
    },
}); 