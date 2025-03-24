import type FeatureSection from './feature-section.interface'
import type BaseModal from './base-modal-interface'

interface InformationModal extends BaseModal {
  items: Record<string, FeatureSection>
}

export default InformationModal
