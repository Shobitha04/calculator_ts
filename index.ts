import * as $ from 'jquery';
(() => {
    const numbers: { [key: string]: number } = {
        'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 
        'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9
    };

    let finalResult: number = 0;
    let operator: string = '';
    let activeOperator: boolean = false;

    // Clear display
    $('#ac').click((): void => {
        $('.result').text('0');
        finalResult = 0;
        operator = '';
        activeOperator = false;
    });

    // Toggle sign
    $('#sign').click((): void => {
        const result: string = $('.result').text() || '';
        $('.result').text(result.startsWith('-') ? result.slice(1) : '-' + result);
    });

    // Calculate percentage
    $('#percentage').click((): void => {
        const result: number = parseFloat($('.result').text() || '0') / 100;
        $('.result').text(result.toString());
    });

    // Handle operators
    $('.operator').click((e: JQuery.ClickEvent): void => {
        const id: string = (e.target as HTMLElement).id;

        if (id === 'equal') {
            calculate();
            $('.result').text(finalResult.toString());
            operator = '';
        } else {
            if (operator) calculate();
            operator = id;
            finalResult = parseFloat($('.result').text() || '0');
            activeOperator = true;
        }
    });

    // Handle number clicks
    $('.number').click((e: JQuery.ClickEvent): void => {
        const num: number = numbers[(e.target as HTMLElement).id];
        
        if (activeOperator) {
            $('.result').text('');
            activeOperator = false;
        }

        const currentText = $('.result').text();
        $('.result').text(currentText === '0' ? num.toString() : currentText + num);
    });

    // Add decimal point
    $('#point').click((): void => {
        if (!($('.result').text() || '').includes('.')) {
            $('.result').text($('.result').text() + '.');
        }
    });

    // Perform calculation based on the selected operator
    const calculate = (): void => {
        const currentValue: number = parseFloat($('.result').text() || '0');
        
        switch (operator) {
            case 'addition': 
                finalResult += currentValue; 
                break;
            case 'subtraction': 
                finalResult -= currentValue; 
                break;
            case 'multiplication': 
                finalResult *= currentValue; 
                break;
            case 'division': 
                if (currentValue !== 0) {
                    finalResult /= currentValue;
                } else {
                    $('.result').text('Error');
                    finalResult = 0;
                }
                break;
            default:
                break;
        }
        $('.result').text(finalResult.toString());
    };
})();
