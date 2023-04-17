import { MainStyled, OptionBarStyled, SideBarStyled, AppLayOutStyled } from "./main-styled";
import OptionBar from "./optionBar/optionBar";
import SideBar from "./sideBar/sideBar";


const Main = () => {
    return (
        <AppLayOutStyled>
            <SideBarStyled>

                <SideBar />
            </SideBarStyled>

            <MainStyled>
                <OptionBarStyled>
                    <OptionBar />
                </OptionBarStyled>
                Main-Page
            </MainStyled>

        </AppLayOutStyled>
    )
}

export default Main;