import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ClipboardCheck, FileText } from 'lucide-react-native';

import AttendanceScreen from '../screens/AttendanceScreen';
import ReportScreen from '../screens/ReportScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        if (route.name === 'Attendance') {
                            return <ClipboardCheck color={color} size={size} />;
                        } else if (route.name === 'Report') {
                            return <FileText color={color} size={size} />;
                        }
                    },
                    tabBarActiveTintColor: '#059669', // Emerald 600
                    tabInactiveTintColor: '#94a3b8', // Slate 400
                    headerStyle: {
                        backgroundColor: '#064e3b', // Emerald 900
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                })}
            >
                <Tab.Screen name="Attendance" component={AttendanceScreen} />
                <Tab.Screen name="Report" component={ReportScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
