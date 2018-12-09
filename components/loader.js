import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export class Loader extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
                <ActivityIndicator size="large" color="#f54740" />
            </View>
        )
    }

}



