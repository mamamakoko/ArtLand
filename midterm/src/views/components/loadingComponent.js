import { Text, View } from "react-native";

const loadingComponent = ({ visible = false }) => {
    return (
        visible && (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    );
};

export default loadingComponent;