<!-- src/components/BaseInput.vue -->
<template>
    <div>
        <div style="margin-bottom: 20px;">
            <div class="input-group">
                <label :for="id">{{ label }}</label>
                <input :id="id" :type="type" :placeholder="placeholder" v-model="inputValue"
                    @input="$emit('update:modelValue', inputValue)" />
            </div>
            <span class="error-message" v-if="error">{{ error }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "BaseInput",
    props: {
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: "text",
        },
        placeholder: {
            type: String,
            default: "",
        },
        modelValue: {
            type: String,
            default: "",
        },
        error: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            inputValue: this.modelValue,
        };
    },
    watch: {
        modelValue(newValue) {
            this.inputValue = newValue;
        },
    },
};
</script>

<style scoped>
.input-group {
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

}

.input-group input {
    width: 250px;
    padding: 10px;
    border-radius: 5px;
    margin: 0px 10px;
}

.error-message {
    color: red;
    font-size: 12px;
}
</style>