interface Variables {
	bgColor: '#0c1a3f';
	bgLightColor: '#182649';
	mutedWhite: '#8c8e93';
	orange: 'lighten(orangered, 0.1)';
	vibrantBlue: '#0ec7ff';
	mutedBlue: '#0f96c2';
	globalPaddingVertical: 'calc(5vh + 4rem)';
	globalPaddingHorizontal: 'calc(12vw + 1rem)';
	roundBorderColor: 'transparentize(lighten($bg-light-color, 20%), 0.7)';
	roundBgRadius: 'calc(1vmin + 1rem)';
	roundBgColor: '#151b2b';
	servicesHeight: 'calc(100vh - #{$global-padding-vertical} * 2)';
	servicesWidth: 'calc(63vw)';
	contactWidth: 'calc(20rem + 5vw)';
	contactHorizontalPadding: '2vw';
	contactRightMargin: 'calc(0.5rem + 1vw)';
	contactFontSize: '1.5rem';
	contactSpaceConst: 'calc(';
	contactSpace: 'calc((#{$contact-space-const}) * var(--index))';
	contactWholeWidth: 'calc(';
	contactMove: 'calc((#{$contact-width} - #{$contact-space-const}) * -1)';
	contactMiddle: 'calc(';
	contactHeight: '6rem';
	mqPhoneBreakPx: '600px';
	mqPhoneBreak: '"(max-width: #{$mq-phone-break-px})"';
	mqPhone: '"screen and #{$mq-phone-break};"';
	mqTabletBreakPx: '900px';
	mqTabletBreak: '"(max-width: #{$mq-tablet-break-px})"';
	mqTablet: '"screen and #{$mq-tablet-break};"';
	mqTabletNotPhone: '"screen and (min-width: #{$mq-phone-break-px}) and #{$mq-tablet-break};"';
	globalPaddingTopOverrideMaxPx: '600px';
	globalPaddingTopOverrideAmount: '3rem';

}

export const variables: Variables;
export default variables;