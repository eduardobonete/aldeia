export default {
    computed: {
    },
    methods: {
        validateEmail(email) {
            var regex = /\S+@\S+\.\S+/;
            return regex.test(email);
        }
    },
};