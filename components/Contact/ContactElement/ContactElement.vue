<template>
    <div
            :class="[
	 {
		'hover': contact.hover,
	 	'selected': contact.selected,
		'small-viewport': smallViewport,
		'big-viewport': !smallViewport
	}, 'contact-container']"
     @[!smallViewport?`mouseover`:`touchstart`]="contact.hover === false ? contact.hover = true : null"
     @[!smallViewport?`mouseout`:`touchend`]="contact.hover === true ? contact.hover = false : null"
     @[!smallViewport?`click`:``]="clicked"
    >
        <div
            class="contact"
             :id="contact.id"
        >

            <font-awesome-icon
                    class="icon"
                    :icon="contact.icon"
            />
            <div class="info-container">
                <div class="subtitle">{{contact.subtitle}}</div>
                <div
                        v-if="!contact.link"
                        class="info"
                        ref="info"
                        v-html="contact.info"
                />
                <a
                        v-else
                        class="info"
                        :href="contact.link"
                        target="_blank"
                        ref="info"
                        v-html="contact.info"
                />
            </div>
            <div
                    class="copy"
                    @[!smallViewport?`click`:`touchstart`]="copyClicked"
            >
                <font-awesome-icon
                        :icon="['far', 'copy']"
                        :class="{'copy-in-progress': copyInProgress}"
                        :title="copyText"
                        @mouseleave="copyTextReset"
                />
                <span id="copy-text">{{copyText}}</span>
            </div>
            <font-awesome-icon
                    icon="times"
                    :class="{'visible': contact.selected}"
                    @click="closeButtonClicked"
            />
        </div>
    </div>
</template>

<script lang="ts" src="./ContactElement.ts"></script>
<style lang="scss" src="./ContactElement.scss"></style>
