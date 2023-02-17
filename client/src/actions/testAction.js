import UseFetch from "../util/UseFetch"

const setTester = (data) => {
    return {
      type: 'READ',
      payload: [data] 
    }
}

export default setTester