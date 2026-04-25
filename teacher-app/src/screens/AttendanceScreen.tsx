import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Modal, TextInput } from 'react-native';
import { useCameraPermissions, CameraView } from 'expo-camera';

const mockStudents = [
    { id: 1, name: 'Alex Johnson', status: null },
    { id: 2, name: 'Maria Garcia', status: 'P' },
    { id: 3, name: 'James Smith', status: null },
    { id: 4, name: 'Linda Kim', status: 'A' },
];

export default function AttendanceScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [isScanning, setIsScanning] = useState(false);
    const [students, setStudents] = useState(mockStudents);

    const [lateModalVisible, setLateModalVisible] = useState(false);
    const [activeLateStudentId, setActiveLateStudentId] = useState<number | null>(null);
    const [lateReason, setLateReason] = useState('');

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', marginBottom: 20 }}>We need your permission to show the camera</Text>
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleBarcodeScanned = ({ data }: any) => {
        setIsScanning(false);
        // Simulate finding a student and marking present
        alert(`Scanned: ${data}. Marked Present!`);
    };

    const handleAttendance = (id: number, status: string) => {
        if (status === 'L') {
            setActiveLateStudentId(id);
            setLateReason('');
            setLateModalVisible(true);
            return;
        }
        setStudents(students.map(s => s.id === id ? { ...s, status } : s));
    };

    const handleSaveLate = () => {
        if (activeLateStudentId) {
            setStudents(students.map(s => s.id === activeLateStudentId ? { ...s, status: 'L' } : s));
        }
        setLateModalVisible(false);
        setActiveLateStudentId(null);
    };

    const handleSaveAttendance = () => {
        alert('Attendance successfully saved and synced!');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.tab, !isScanning && styles.activeTab]} onPress={() => setIsScanning(false)}>
                    <Text style={[styles.tabText, !isScanning && styles.activeTabText]}>Manual List</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, isScanning && styles.activeTab]} onPress={() => setIsScanning(true)}>
                    <Text style={[styles.tabText, isScanning && styles.activeTabText]}>Scan QR</Text>
                </TouchableOpacity>
            </View>

            {isScanning ? (
                <View style={styles.cameraContainer}>
                    <CameraView
                        style={styles.camera}
                        facing="back"
                        onBarcodeScanned={isScanning ? handleBarcodeScanned : undefined}
                    />
                    <View style={styles.overlay}>
                        <View style={styles.scanBox} />
                        <Text style={styles.scanText}>Position QR Code in the frame</Text>
                    </View>
                </View>
            ) : (
                <ScrollView style={styles.listContainer}>
                    {students.map(student => (
                        <View key={student.id} style={styles.studentCard}>
                            <View>
                                <Text style={styles.studentName}>{student.name}</Text>
                                {student.status === 'L' && (
                                    <Text style={styles.lateReasonText}>Recorded as Late</Text>
                                )}
                            </View>
                            <View style={styles.actionRow}>
                                <TouchableOpacity
                                    style={[styles.actionBtn, student.status === 'P' && styles.btnP]}
                                    onPress={() => handleAttendance(student.id, 'P')}
                                ><Text style={[styles.actionText, student.status === 'P' && styles.activeActionText]}>P</Text></TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.actionBtn, student.status === 'A' && styles.btnA]}
                                    onPress={() => handleAttendance(student.id, 'A')}
                                ><Text style={[styles.actionText, student.status === 'A' && styles.activeActionText]}>A</Text></TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.actionBtn, student.status === 'L' && styles.btnL]}
                                    onPress={() => handleAttendance(student.id, 'L')}
                                ><Text style={[styles.actionText, student.status === 'L' && styles.activeActionText]}>L</Text></TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )}

            {!isScanning && (
                <View style={styles.bottomBar}>
                    <TouchableOpacity style={styles.saveBtn} onPress={handleSaveAttendance}>
                        <Text style={styles.saveBtnText}>Save Attendance</Text>
                    </TouchableOpacity>
                </View>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={lateModalVisible}
                onRequestClose={() => setLateModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Record Late Arrival</Text>
                        <Text style={styles.modalSubtitle}>Please enter the time arrived and the reason for tardiness.</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="e.g. 8:15 AM - Bus delayed"
                            value={lateReason}
                            onChangeText={setLateReason}
                            autoFocus
                        />
                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setLateModalVisible(false)}>
                                <Text style={styles.modalCancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalSaveBtn} onPress={handleSaveLate}>
                                <Text style={styles.modalSaveText}>Save Reason</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    button: {
        backgroundColor: '#059669',
        padding: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    tabContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: '#ecfdf5',
    },
    tabText: {
        color: '#64748b',
        fontWeight: '600',
    },
    activeTabText: {
        color: '#059669',
    },
    cameraContainer: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanBox: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: '#059669',
        backgroundColor: 'transparent',
        borderRadius: 20,
        marginBottom: 20,
    },
    scanText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    listContainer: {
        padding: 16,
    },
    studentCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    studentName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
    },
    actionRow: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 8,
        overflow: 'hidden',
    },
    actionBtn: {
        width: 40,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderRightWidth: 1,
        borderRightColor: '#e2e8f0',
    },
    actionText: {
        fontWeight: 'bold',
        color: '#64748b',
    },
    activeActionText: {
        color: '#fff',
    },
    btnP: { backgroundColor: '#22c55e' },
    btnA: { backgroundColor: '#ef4444' },
    btnL: { backgroundColor: '#f59e0b' },
    bottomBar: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    saveBtn: {
        backgroundColor: '#0f172a',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    lateReasonText: {
        fontSize: 12,
        color: '#f59e0b',
        marginTop: 4,
        fontWeight: '500',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 8,
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 16,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        fontSize: 15,
        marginBottom: 24,
        backgroundColor: '#f8fafc',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
    modalCancelBtn: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    modalCancelText: {
        color: '#64748b',
        fontWeight: '600',
    },
    modalSaveBtn: {
        backgroundColor: '#059669',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    modalSaveText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
