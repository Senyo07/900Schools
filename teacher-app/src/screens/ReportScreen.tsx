import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';

export default function ReportScreen() {
    const [reportText, setReportText] = useState('');
    const [isPolishing, setIsPolishing] = useState(false);
    const [polishedText, setPolishedText] = useState('');

    const handlePolish = () => {
        if (!reportText) return;
        setIsPolishing(true);
        setTimeout(() => {
            setPolishedText("Alex continuously disrupted the mathematics lesson today by speaking out of turn and throwing small objects across the classroom. Despite multiple formal warnings to cease the behavior, Alex refused to comply and challenged the teacher's authority in front of peers.");
            setIsPolishing(false);
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>

                <View style={styles.card}>
                    <Text style={styles.title}>Behavior Workflow & AI Polish</Text>
                    <Text style={styles.subtitle}>Log incidents quickly and let AI professionalize the tone.</Text>

                    <Text style={styles.label}>Student Name or ID</Text>
                    <View style={styles.searchRow}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search student..."
                            placeholderTextColor="#94a3b8"
                        />
                        <TouchableOpacity style={styles.scanBtn}>
                            <Text style={styles.scanBtnText}>Scan QR</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Raw Teacher Input</Text>
                    <TextInput
                        style={styles.textArea}
                        multiline
                        numberOfLines={4}
                        placeholder="Type or dictate the rough description of what happened..."
                        placeholderTextColor="#94a3b8"
                        value={reportText}
                        onChangeText={setReportText}
                        textAlignVertical="top"
                    />

                    <TouchableOpacity
                        style={[styles.polishBtn, (!reportText || isPolishing) && styles.polishBtnDisabled]}
                        onPress={handlePolish}
                        disabled={!reportText || isPolishing}
                    >
                        {isPolishing ? (
                            <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
                        ) : null}
                        <Text style={styles.polishBtnText}>{isPolishing ? 'Polishing...' : 'AI Polish Report'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Professional Output</Text>
                    <View style={styles.outputBox}>
                        {isPolishing ? (
                            <Text style={styles.placeholderText}>Generating professional report...</Text>
                        ) : polishedText ? (
                            <Text style={styles.outputText}>{polishedText}</Text>
                        ) : (
                            <Text style={styles.placeholderText}>Polished output will appear here...</Text>
                        )}
                    </View>

                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.secondaryBtn}>
                            <Text style={styles.secondaryBtnText}>Flag Internally</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.primaryBtn}>
                            <Text style={styles.primaryBtnText}>Notify Parents</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f5f9',
    },
    scroll: {
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 8,
    },
    textArea: {
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        padding: 16,
        height: 120,
        fontSize: 15,
        color: '#334155',
        marginBottom: 12,
    },
    polishBtn: {
        backgroundColor: '#059669',
        paddingVertical: 14,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    polishBtnDisabled: {
        backgroundColor: '#94a3b8',
    },
    polishBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    outputBox: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        padding: 16,
        height: 120,
        marginBottom: 16,
    },
    outputText: {
        fontSize: 15,
        color: '#334155',
        lineHeight: 22,
    },
    placeholderText: {
        fontSize: 15,
        color: '#94a3b8',
        fontStyle: 'italic',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
    secondaryBtn: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        backgroundColor: '#fff',
    },
    secondaryBtnText: {
        color: '#475569',
        fontWeight: '600',
    },
    primaryBtn: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#0f172a',
    },
    primaryBtnText: {
        color: '#fff',
        fontWeight: '600',
    },
    searchRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 44,
        fontSize: 15,
        color: '#334155',
    },
    scanBtn: {
        backgroundColor: '#10b981',
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    scanBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
