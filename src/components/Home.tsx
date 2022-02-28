import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native-design-utility';

const HomeScreen = () => {
    const { t, i18n } = useTranslation();
    return (
        <Text>
        {t("WelcomeText")}
      </Text>
    )
}

export default HomeScreen