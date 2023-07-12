import axios from "axios";
import { initMockApiCalls } from "../tests/data/apiServiceMocks";

//Set this to true to enable test mode, meaning use mock server connection instead of real.
const TEST_MODE = true;
if (TEST_MODE) {
    initMockApiCalls();
}

export default axios.create({
    baseURL: 'https://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
}); 