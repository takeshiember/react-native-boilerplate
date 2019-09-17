// Global Imports
import * as React from "react";
import { useDispatch } from "react-redux";

import {
    Image,
    Dimensions,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import RouterActions from "@Services/RouterActions";
import { HomeActions } from "@Actions";
import { IHomePage } from "@Interfaces";

// Local Styles
import {
    Container,
    Apod,
    ApodButton,
    ApodText,
    Middle,
    Centered,
    Buttons,
    LocaleButtonText,
} from "./styled";

import { Heading } from "@Components";
import { useTranslation } from "react-i18next";

const styles = StyleSheet.create({
    stretch: {
        width: Dimensions.get("window").width - 50,
        resizeMode: "contain",
    },
});

const Home: React.FunctionComponent<IHomePage.IProps> = () => {
    const { t, i18n } = useTranslation();

    const dispatch = useDispatch();

    const renderLocaleButtons = (activeLanguage: string) =>
        ["en", "es", "tr"].map(lang => (
            <TouchableOpacity
                key={lang}
                onPress={() => i18n.changeLanguage(lang)}>
                <LocaleButtonText isActive={activeLanguage === lang}>
                    {lang}
                </LocaleButtonText>
            </TouchableOpacity>
        ));

    const handleApod = () => {
        dispatch(
            HomeActions.GetApod({
                params: { hd: false },
            })
        );
        RouterActions.push("Apod");
    };

    return (
        <Container>
            <Image
                style={styles.stretch}
                source={require("/static/images/pankod-logo.png")}
            />
            <Middle>
                <Centered>
                    <Heading text={t("common:Hello")} />
                    <Buttons>{renderLocaleButtons(i18n.language)}</Buttons>
                </Centered>
                <Apod>
                    <ApodButton onPress={() => handleApod()}>
                        <ApodText>{t("home:Space")}</ApodText>
                    </ApodButton>
                </Apod>
            </Middle>
        </Container>
    );
};

export default Home;
