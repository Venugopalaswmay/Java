import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { StorageService } from '@/services/storage';
import { Ingredient } from '@/types';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function SettingsScreen() {
    const colorScheme = useColorScheme();
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadPreferences();
    }, []);

    const loadPreferences = async () => {
        const prefs = await StorageService.getPreferences();
        setIngredients(prefs.avoidList);
    };

    const handleAdd = async () => {
        if (!inputText.trim()) return;

        setLoading(true);
        try {
            const updated = await StorageService.addIngredientToAvoid(inputText);
            setIngredients(updated.avoidList);
            setInputText('');
        } catch (error) {
            Alert.alert('Error', 'Failed to add ingredient');
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (id: string) => {
        const updated = await StorageService.removeIngredient(id);
        setIngredients(updated.avoidList);
    };

    const renderItem = ({ item }: { item: Ingredient }) => (
        <View style={[styles.itemContainer, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemAliases} numberOfLines={1}>
                    Aliases: {item.aliases.join(', ') || 'None'}
                </Text>
            </View>
            <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.deleteButton}>
                <FontAwesome name="trash" size={20} color={Colors[colorScheme ?? 'light'].warning} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        {
                            color: Colors[colorScheme ?? 'light'].text,
                            borderColor: Colors[colorScheme ?? 'light'].tabIconDefault
                        }
                    ]}
                    placeholder="Add ingredient to avoid (e.g. Sugar)"
                    placeholderTextColor="#999"
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={handleAdd}
                />
                <TouchableOpacity
                    style={[styles.addButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
                    onPress={handleAdd}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <FontAwesome name="plus" size={16} color="#fff" />
                    )}
                </TouchableOpacity>
            </View>

            <FlatList
                data={ingredients}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No ingredients in your avoid list yet.</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        marginRight: 10,
        fontSize: 16,
    },
    addButton: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        paddingBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemInfo: {
        flex: 1,
        marginRight: 10,
        backgroundColor: 'transparent',
    },
    itemName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    itemAliases: {
        fontSize: 12,
        opacity: 0.7,
    },
    deleteButton: {
        padding: 10,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        opacity: 0.5,
    },
});
