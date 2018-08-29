export const isDefined = object => typeof object !== 'undefined';

export const fadeElementIn = element => element.closest('.fade').classList.add('in');

export const openLink = url => window.open(url, '_blank');
