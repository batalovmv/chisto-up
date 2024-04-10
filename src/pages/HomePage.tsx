// homePage в данном случае страница задания

import { useAppDispatch } from "../app/store";
import Header from "../components/Header/Header";
import ItemListContainer from "../containers/ItemListContainer";



const HomePage = () => {
    return (
        <div>
            
            <ItemListContainer />
        </div>
    );
};

export default HomePage;