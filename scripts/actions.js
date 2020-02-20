var curTab
var curFaqItem
var sex, purpose, bodyMeasure, activity

// Для формы заказа
var order = new Object(), stepNumber = 1
    order.address = new Object()
    order.personalData = new Object()
var sliderOn = false

order.address.isFilled = function () {
    if (order.address.street && order.address.houseNumber && order.address.appartament && order.address.timeInterval)
        return true
    else return false
}

order.personalData.isFilled = function () {
    if (order.personalData.name && order.personalData.surname && order.personalData.phoneNumber)
        return true
    else return false
}

var openModal = function () {
    $('.modal-window').css("opacity", "0")
    $('.modal-window').css("display", "flex")
    $('.modal-window').animate({opacity: "1"}, 500)
}

var calc = function() {
    var kPurpose, kActivity, total

    // console.log($(sex).children().val())
    total = 9.99 * bodyMeasure.weight + 6.25 * bodyMeasure.height - 4.92 * bodyMeasure.age
    switch ($(sex).children().val()) {
        case 'male': {
            total +=5
            break
        }
        case 'female': {
            total -= 161
            break
        }
    }

    // console.log($(purpose).children().val())
    switch ($(purpose).children().val()) {
        case 'w1': {
            kPurpose = 0.82
            break
        }
        case 'w2': {
            kPurpose = 1
            break
        }
        case 'w3': {
            kPurpose = 1.15
            break
        }
    }
    total *= kPurpose

    // console.log($(activity).children().val())
    switch ($(activity).children().val()) {
        case 'l1': {
            kActivity = 1.2
            break
        }
        case 'l2': {
            kActivity = 1.35
            break
        }
        case 'l3': {
            kActivity = 1.48
            break
        }
        case 'l4': {
            kActivity = 1.6
            break
        }
        case 'l5': {
            kActivity = 1.75
            break
        }
    }
    total *= kActivity

    total = total.toLocaleString('ru', {style: 'decimal', maximumFractionDigits: 1}) + '*'
    // console.log(total)
    $('#total-ccal').html(total)
}

$('document').ready(function () {
    curTab = $('.tabs button[class="selected"]')
    bodyMeasure = new Object()

    $('header .content button').click(openModal)

    $('.callback-form button').click(function () {
        alert('Перезвоним в течении 5 минут') // Временная заглушка
    })

    $('.prices button').click(openModal)

    $('.tabs button').click(function () {
        curTab.removeAttr('class', 'selected')
        $(this).attr('class', 'selected')
        $('.faq-item-body').hide()
        $('.faq-item h3').css("background-image", "Url(images/open.png)")

        switch ($(this).attr('name'))
        {
            case 't1': {
                $('#'+$(curTab).attr('name')).hide()
                curTab = $(this)
                $('#t1').css('opacity', '0')
                $('#t1').css('display', 'block')
                $('#t1').animate({opacity: '1'}, 500)
                break
            }
            case 't2': {
                $('#'+$(curTab).attr('name')).hide()
                curTab = $(this)
                $('#t2').css('opacity', '0')
                $('#t2').css('display', 'block')
                $('#t2').animate({opacity: '1'}, 500)
                break
            }
            case 't3': {
                $('#'+$(curTab).attr('name')).hide()
                curTab = $(this)
                $('#t3').css('opacity', '0')
                $('#t3').css('display', 'block')
                $('#t3').animate({opacity: '1'}, 500)
                break
            }
        }
    })

    $('.faq-item h3').click(function () {
        if (curFaqItem) {
            $(curFaqItem).removeAttr('class')
            // $(curFaqItem).css("background-image", "Url(images/open.png)")
            $(curFaqItem).next().slideUp()

            if ($(curFaqItem).html() != $(this).html()) {
                $(this).attr('class', 'opened')
                // $(this).css("background-image", "Url(images/close.png)")
                $(this).next().slideDown()
                curFaqItem = $(this)
            } else curFaqItem = null
        } else {
            $(this).attr('class', 'opened')
            // $(this).css("background-image", "Url(images/close.png)")
            $(this).next().slideDown()
            curFaqItem = $(this)
        }


    })

    $('.calc-step-value label').click(function (e) {
        if (e.target.tagName == 'LABEL') {
            switch ($(this).parent().attr('class').substring(16)) {
                case 'clv-1': {
                    if (sex)
                        $(sex).removeAttr('class')
                    $(this).attr('class', 'selected')
                    sex = this

                    $(this).parent().css('border-radius', '0')
                    $('.clv-2').parent().css('display', 'flex')
                    $('.clv-2').parent().animate({opacity: "1"}, 500)
                    break
                }
                case 'clv-2': {
                    if (purpose)
                        $(purpose).removeAttr('class')
                    $(this).attr('class', 'selected')
                    purpose = this

                    $(this).parent().css('border-radius', '0')
                    $('.clv-3').parent().css('display', 'flex')
                    $('.clv-3').parent().animate({opacity: "1"}, 500)
                    break
                }
                case 'last-calc-step-value': {
                    if (activity)
                        $(activity).removeAttr('class')
                    $(this).attr('class', 'selected')
                    activity = this

                    $(this).parent().css('border-radius', '0')
                    $('.result').css('display', 'flex')
                    $('.result').animate({opacity: "1"}, 500)
                    break
                }
            }

            calc()
        }
    })

    $('.clv-3 input').keypress(function (eventObject) {
        if (eventObject.which<48 || eventObject.which>57)
            return false
    })

    $('.clv-3 input').keyup(function (eventObject) {
        switch ($(this).attr('name')) {
            case 'age': {
                bodyMeasure.age = Number($(this).val())
                if (eventObject.which == 13)
                    $('input[name="height"]').focus()
                break
            }
            case 'height': {
                bodyMeasure.height = Number($(this).val())
                if (eventObject.which == 13)
                    $('input[name="weight"]').focus()
                break
            }
            case 'weight': {
                bodyMeasure.weight = Number($(this).val())
                break
            }
        }

        if (bodyMeasure.age && bodyMeasure.height && bodyMeasure.weight) {
            $(this).parent().parent().css('border-radius', '0')
            $('.last-calc-step-value').parent().css('display', 'flex')
            $('.last-calc-step-value').parent().animate({opacity: "1"}, 800)
            calc()
        }
    })

    $('.program').click(function () {
        openModal()
        // Дописать очистку модального окна на случай, если оно уже открывалось и заполнялось
    })

    $('.program').hover(
        function () {
            $(this).children('.mask').stop(true)
            $(this).children('p').stop(true)
            $(this).children('.mask').animate({opacity: '0'}, 350)
            $(this).children('p').animate({opacity: '1'}, 350)
    },
        function () {
            $(this).children('.mask').stop(true)
            $(this).children('p').stop(true)
            $(this).children('.mask').animate({opacity: '1'}, 250)
            $(this).children('p').animate({opacity: '0'}, 250)
    })

    $('button#make-order').click(function () {
        openModal()
    })

    $('.total button').click(function () {
        alert('Okay')
        return false
    })

    $('.modal-header button').click(function () {
        $(this).parent().parent().parent().fadeOut('slow')
    })

    $('.order-program').click(function () {
        $('.order-program').removeClass('selected')
        $(this).addClass('selected')
        orderProgram = $(this).children().html()
    })

    $('.duration-slider').mousedown(function () {
        sliderOn = true
    })

    $('.duration-slider').mousemove(function (eventObject) {
        if (sliderOn) {
            var shift = eventObject.pageX - $(this).position().left - 15

            if (shift >= 0 && shift <= $(this).width() - 30) {
                $(this).children().css('left', shift)
                shift = Math.round(87 * shift / ($(this).width() - 30) + 3)
                $('.duration input[name="duration"]').val(shift)
            }
        }
    })

    $('.duration input[name="duration"]').keydown(function (eventObject) {
        // console.log(eventObject.which)
        // if (!(eventObject.which > 48 && eventObject.which < 57 || eventObject.which == 8))
        //     return false
    })

    $('.duration input[name="duration"]').keyup(function () {
        var dayCount = $(this).val()
        var shift = (dayCount - 3) / 87 * ($('.duration-slider').width() - 30)

        if (shift < 0)
            shift = 0
        else if (shift > $('.duration-slider').width() - 30)
            shift = $('.duration-slider').width() - 30

        $('.duration-slider div').css('left', shift)
    })

    $('.duration input[name="duration"]').focusout(function () {
        var dayCount = Number($('.duration input[name="duration"]').val())

        if (dayCount > 90)
            $('.duration input[name="duration"]').val(90)

        if (dayCount < 3)
            $('.duration input[name="duration"]').val(3)
    })

    $('.modal-window').mouseup(function () {
        sliderOn = false
    })

    $('.interval span').click(function () {
        $('.interval span').removeClass('selected')
        $(this).addClass('selected')
    })

    $('.payment-method span').click(function () {
        $('.payment-method span').removeClass('selected')
        $(this).addClass('selected')
    })

    $('#prev-order-step').click(function () {
        stepNumber--
        switch (stepNumber) {
            case 1: {
                $('.order-step[data-step-number="2"]').removeClass('current-order-step')
                $('.order-step[data-step-number="1"]').addClass('current-order-step')
                $('#step-header').html('Выбор программы питания')
                $('.order-progress span').html(stepNumber)
                break
            }
            case 2: {
                $('.order-step[data-step-number="3"]').removeClass('current-order-step')
                $('.order-step[data-step-number="2"]').addClass('current-order-step')
                $('#step-header').html('Настройка программы питания')
                $('.order-progress span').html(stepNumber)
                break
            }
            case 3: {
                $('.order-step[data-step-number="4"]').removeClass('current-order-step')
                $('.order-step[data-step-number="3"]').addClass('current-order-step')
                $('#step-header').html('Доставка')
                $('.order-progress span').html(stepNumber)

                $('#next-order-step').html('Дальше')
                break
            }
        }
    })

    $('#next-order-step').click(function () {
        stepNumber++
        switch (stepNumber) {
            case 2: {
                order.Caloricity = $('.order-program.selected').attr('data-caloricity')
                order.cost = $('.order-program.selected').attr('data-cost')

                if (order.Caloricity) {
                    $('.order-step[data-step-number="1"]').removeClass('current-order-step')
                    $('.order-step[data-step-number="2"]').addClass('current-order-step')
                    $('#step-header').html('Настройка программы питания')
                    $('.current-order-step input[name="caloricity"]').val(order.Caloricity)
                    $('.order-progress span').html(stepNumber)
                } else {
                    stepNumber--
                    alert('Выберите программу питания')
                }
                break
            }
            case 3: {
                $('.order-step[data-step-number="2"]').removeClass('current-order-step')
                $('.order-step[data-step-number="3"]').addClass('current-order-step')
                $('#step-header').html('Доставка')
                $('.order-progress span').html(stepNumber)
                break
            }
            case 4: {
                order.address.street = $('.order-step[data-step-number="3"] input[name="street"]').val()
                order.address.houseNumber = $('.order-step[data-step-number="3"] input[name="house-number"]').val()
                order.address.appartament = $('.order-step[data-step-number="3"] input[name="appartament"]').val()
                order.address.floor = $('.order-step[data-step-number="3"] input[name="floor"]').val()
                order.address.entrance = $('.order-step[data-step-number="3"] input[name="entrance"]').val()
                order.address.intercom = $('.order-step[data-step-number="3"] input[name="intercom"]').val()
                order.address.duration = $('.duration input[name="duration"]').val()
                order.address.timeInterval = $('.interval span.selected').html()
                order.address.remark = $('.order-step[data-step-number="3"] textarea').html()

                if (order.address.isFilled()) {
                    $('.order-step[data-step-number="3"]').removeClass('current-order-step')
                    $('.order-step[data-step-number="4"]').addClass('current-order-step')
                    $('#step-header').html('Контактные данные и оплата')
                    $('.total-cost span').html((order.cost * order.address.duration).toLocaleString("ru"))
                    $('.order-progress span').html(stepNumber)

                    $('#next-order-step').html('Оплатить')
                } else {
                    stepNumber--
                    alert('Укажите адрес и временное окно доставки')
                }
                break
            }
            case 5: {
                order.personalData.name = $('.personal-data input[name="name"]').val()
                order.personalData.surname = $('.personal-data input[name="surname"]').val()
                order.personalData.phoneNumber = $('.personal-data input[name="phoneNumber"]').val()
                order.personalData.email = $('.personal-data input[name="email"]').val()
                order.paymentMethod = $('.payment-method span.selected').html()
                console.log(order)

                if (!(order.personalData.isFilled() && order.paymentMethod))
                    alert('Укажите свои контактные данные и метод оплаты')

                stepNumber--
                break
            }
        }
    })
})






























