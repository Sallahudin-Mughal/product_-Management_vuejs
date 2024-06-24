<template>
    <div>
        <button :style="{ width: buttonWidth, backgroundColor: backColor }" v-on="$listeners">
            <slot></slot>
        </button>
    </div>
</template>

<script>
export default {
    name: 'ButtonComponent',
    props: {
        buttonWidth: {
            type: String,
            default: '200px',
        },
        backColor: {
            type: String,
            default: 'green',
        },
    }

}
</script>

<style scoped>
button {
    border: none;
    color: white;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>