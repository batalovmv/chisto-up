// homePage в данном случае страница задания

import { useAppDispatch } from "../app/store";
import Header from "../components/Header/Header";
import ItemListContainer from "../containers/ItemListContainer";
import styles from './HomePage.module.scss';


const HomePage = () => {
    return (
        <div className={styles.homePage}>
            <ItemListContainer />
        </div>
    );
};

export default HomePage;