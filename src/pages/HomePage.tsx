// homePage в данном случае страница задания
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